from aws_cdk import (
    Duration,
    Stack,
    aws_lambda as lambda_,
    aws_events as events_,
    aws_events_targets as targets_,
    aws_iam as iam_,
    RemovalPolicy,
    # aws_sqs as sqs,
)

from aws_cdk.aws_lambda import LayerVersion 
from constructs import Construct

class WebHealthCrawlerStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        layer = self.createLayer("lambda_layer",'./layers')
        WebHealthLambda = self.create_lambda("webHealthCrawlerLambda", "./resources", "lambda.lambda_handler",layer)
        WebHealthLambda.apply_removal_policy(RemovalPolicy.DESTROY)
        period = events_.Schedule.rate(Duration.minutes(1))
        target = targets_.LambdaFunction(WebHealthLambda)
        rule = events_.Rule(self, "Web Health Invocation Rule",
                            description="This is a scheduled/periodic function",
                            enabled=True,
                            schedule=period,
                            targets=[target])
        

    def create_lambda(self, id_, asset, handler,layer):
        return lambda_.Function(self, id_,
                                runtime=lambda_.Runtime.PYTHON_3_9,
                                handler=handler,
                                code=lambda_.Code.from_asset(asset),
                                layers = [layer],
                                timeout=Duration.minutes(5))

    def createLayer(self,id, asset):
        return LayerVersion(self,id,
        code=lambda_.Code.from_asset(asset),
        compatible_runtimes =[lambda_.Runtime.PYTHON_3_9])
