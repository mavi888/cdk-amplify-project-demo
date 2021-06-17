const awsconfig = {
    'aws_appsync_graphqlEndpoint': `${process.env.REACT_APP_APPSYNC_API}`,
    'aws_appsync_region': `${process.env.REACT_APP_REGION}`,
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
    Auth: {
        identityPoolId: `${process.env.REACT_APP_IDENTITY_POOL_ID}`,
        region: `${process.env.REACT_APP_REGION}`,
        identityPoolRegion: `${process.env.REACT_APP_REGION}`,
        userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
        userPoolWebClientId: `${process.env.REACT_APP_USER_POOL_CLIENT_ID}`,
    }
};

export default awsconfig;