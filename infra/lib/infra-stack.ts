import * as cdk from "@aws-cdk/core"
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as iam from "@aws-cdk/aws-iam"
import {BuildSpec} from "@aws-cdk/aws-codebuild";
import * as s3 from "@aws-cdk/aws-s3"
import * as codecommit from "@aws-cdk/aws-codecommit"

export class InfraStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'widgetReact' });
        // const codecommitSource =
        //     codebuild.Source.codeCommit({repository})


        // github source
        const gitHubSource = codebuild.Source.gitHub({
            owner: 'manrodri',
            repo: 'reactWidgets',
            webhook: true,
            webhookFilters: [
                codebuild.FilterGroup
                    .inEventOf(codebuild.EventAction.PUSH)
                    .andBranchIs('master')]

        });

        const frontendBucket = new s3.Bucket(this, 'frontendBucket', {
            bucketName: "widgets.soydecai.xyz",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,

            websiteIndexDocument: 'index.html',
            publicReadAccess: true
        })

        const buildProject = new codebuild.Project(this, 'widgetReactProject', {
            source: gitHubSource,
            buildSpec: BuildSpec.fromSourceFilename("infra/buildspec.yaml"),
            projectName: "frontendCodeBuildJob",
            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
                environmentVariables: {
                    HOSTING_BUCKET: {
                        value: frontendBucket.bucketName,
                        type: codebuild.BuildEnvironmentVariableType.PLAINTEXT
                    }
                }
            }
        });

        buildProject.role?.addToPolicy(new iam.PolicyStatement({
            actions: ["s3:*"],
            resources: [frontendBucket.bucketArn, `${frontendBucket.bucketArn}/*`]
        }))


    }
}
