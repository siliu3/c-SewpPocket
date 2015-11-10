from flask_restful import reqparse
from flask import current_app, request
#
from layers.infrastructure_layer.error.error_type import RequestError


class ExArgument(reqparse.Argument):

    def __init__(self, *args, **kwargs):
        super(ExArgument, self).__init__(*args, **kwargs)

    def handle_validation_error(self, error, bundle_errors):
        help_str = '(%s) ' % self.help if self.help else ''
        error_msg = ' '.join(
            [help_str, str(error)]) if help_str else str(error)
        if current_app.config.get("BUNDLE_ERRORS", False) or bundle_errors:
            msg = {self.name: "%s" % (error_msg)}
            return error, msg
        msg = {self.name: "%s" % (error_msg)}
        # flask_restful.abort(400, message=msg)
        raise RequestError(msg)


class ExRequestParser(reqparse.RequestParser):

    def __init__(self, *args, **kwargs):
        kwargs['argument_class'] = ExArgument
        super(ExRequestParser, self).__init__(*args, **kwargs)

    def parse_args(self, req=None, strict=False):
        if req is None:
            req = request

        namespace = self.namespace_class()

        req.unparsed_arguments = dict(
            self.argument_class('').source(req)) if strict else {}
        errors = {}
        for arg in self.args:
            value, found = arg.parse(req, self.bundle_errors)
            if isinstance(value, ValueError):
                errors.update(found)
                found = None
            if found or arg.store_missing:
                namespace[arg.dest or arg.name] = value
        if errors:
            raise RequestError(errors)

        if strict and req.unparsed_arguments:
            raise RequestError('Unknown arguments: %s'
                                        % ', '.join(
                                            req.unparsed_arguments.keys()))

        return namespace
