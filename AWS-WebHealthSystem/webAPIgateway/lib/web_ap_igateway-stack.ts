import { Stack, StackProps } from 'aws-cdk-lib'; 
import { Duration } from 'aws-cdk-lib';
import * as lambda_ from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from "path";
import * as cdk from 'aws-cdk-lib';

export class WebApIgatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let role = this.create_role();
    let lambda_layer = this.createLayer('lambda_layer',path.join(__dirname,'../layers'))
    let lambda_api_backend = this.createLambda('lambda_api_backend',path.join(__dirname,'../resources'),'backend.handler',role,lambda_layer)

    const api = new apigateway.LambdaRestApi(this,'sherazWebCrawlerAPI',{handler: lambda_api_backend});

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'WebHealthAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }

  // Class functions

  createLambda(id:string, asset:string,handler:string,role:any,layer:any){
    return new lambda_.Function(this,id,{
                                      code: lambda_.Code.fromAsset(asset),
                                      runtime:lambda_.Runtime.NODEJS_18_X,
                                      handler: handler,
                                      timeout :Duration.minutes(5),
                                      layers : [layer],
                                      role : role
                                      });
  }

  create_role(this:any){
    const role = new iam.Role(this,"lambda_role",{assumedBy:new iam.ServicePrincipal("lambda.amazonaws.com")});
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"));
    return role;
 
  }


  createLayer(id:string, asset:string){
    return new lambda_.LayerVersion(this,id,{code:lambda_.Code.fromAsset(asset),compatibleRuntimes:[lambda_.Runtime.NODEJS_18_X]});
  } 
}