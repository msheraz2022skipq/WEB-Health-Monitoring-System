import aws_cdk as core
import aws_cdk.assertions as assertions

from web_health_lambda.web_health_lambda_stack import WebHealthLambdaStack

# example tests. To run these tests, uncomment this file along with the example
# resource in web_health_lambda/web_health_lambda_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = WebHealthLambdaStack(app, "web-health-lambda")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
