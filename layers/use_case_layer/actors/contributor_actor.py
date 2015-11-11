
from layers.use_case_layer.systems import AuthSystem
from layers.domain_layer.repositories import UserRepository,TokenRepository
from layers.domain_layer.repositories import AccountRepository

from layers.infrastructure_layer.context import Transaction_
from consumer_actor import ConsumerActor

class ContributorActor(ConsumerActor):

    def get_contributor(self):
        return UserRepository().get_contributor(self._user_id)

    def get_contributor_posts(self):
        return self.get_contributor().posts

    def get_post_deal_req_comments(self,post_id):
        contributor = self.get_contributor()
        return contributor.get_post_deal_req_comments(post_id)

    @Transaction_
    def new_post_deal_req_comment(self,post_id,content):
        contributor = self.get_contributor()
        return contributor.new_post_deal_req_comment(post_id,content)

    @Transaction_
    def create_new_post(self,name,category,price,description):
        contributor = self.get_contributor()
        return contributor.new_post(name,category,price,description)

    @Transaction_
    def agree_post_request(self,post_id,request_id):
        contributor = self.get_contributor()
        return contributor.agree_post_request(post_id,request_id)

    @Transaction_
    def refuse_post_request(self,post_id,request_id):
        contributor = self.get_contributor()
        return contributor.refuse_post_request(post_id,request_id)

