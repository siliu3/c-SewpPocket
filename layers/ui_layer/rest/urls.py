# =*= encoding:utf-8 =*=
from resources import *

URLS = {
    '/api/token': TokenResource,
    '/api/account': AccountResource,


    '/api/contributor/posts': ContributorPostsResource, #查看已经发表的物品和发表新物品
    '/api/contributor/post/<int:post_id>/request/<int:request_id>': ContributorPostRequestResource, #对物品的某个请求进行同意或者拒绝
    '/api/contributor/post/<int:post_id>/deal_request/comments': ContributorPostDealReqCommentsResource, #对已经成功交易的物品的请求进行评论

    '/api/consumer': ConsumerResource, #查看用户信息
    '/api/consumer/requests': ConsumerRequestsResource, #查看已经有的请求，新的请求
    '/api/consumer/request/<int:request_id>/comments': ConsumerRequestCommentsResource, #对成功的请求评价，获取所有评价

    '/api/posts': PostsResource
}
