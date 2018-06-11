import * as admin from 'firebase-admin';

export default class Database {
    static init(): void {
        const serviceAccount: admin.ServiceAccount = {
            // "type": "service_account",
            projectId: 'pool-hopping-206921',
            // "private_key_id": "3f01b15cc682c2d9b9a55f29522ba5397cdaff6a",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYkz4gz9PaTVsl\nZcHg0eEzQKSTBe4mGtY2bIHTFdiDmTPlTRu3bR/rOvNrlK1PhrpXGg1/FjCbLA9V\nO+/psBNeBhMD0jia5Q3Vbujmyzlq9BdyX8GW5QZFBHvviZuMwkx3zcUNmjOAy8ei\nR1oFBAWQtcAUtCmYoh7nj0OjM53X2Cu3NERr+WV2Jdkjuv3u/Hvtojpio0M9lY7N\np8m/r73Rd33R8f8H73JSlsKwfQ4saW58pqYtvzCbOG3SRg9KbO1yRUcqvTKo5F9W\nGeifrADonI4wsLv6qxMp0jzjv7wcFOmnntRYBgA2cY0Km+6bSYqNnzpAjOUbQR7n\nnmxvqJNdAgMBAAECggEACB7axpQhI67h0W38IWsyQqV9DOPa1BWHaK/3l0SZTeRv\nIL7CS/iHeMreA/q5YFtHRYBaDwqfOCcNGDLU4aRw3McofG0pfO8A1ecDB4Ocpk61\nr8KdHbBKAuLf9h9mE29k8qxq7D7Ui7/s0RGInu3i85vaIbqhYHcNJjMXvRLaeA97\njEhIW+YL/ckyimIRkRvMXLZKjq1EUQJKuLM9KBYcCVUfihRAN7pdYlRU03MouaYc\n2vfpwwKaAY+SOBESK24ALshWZmFChxNf1zDgBhZnWvVH8xuVb0USDaRtwVWlSPAF\nLmMAzzpmovF6MCLHIuPIYtortpulrCFOJMPiZhYYqQKBgQDHail3XLy5x9gDrIyB\n8bAG/PKy/RNqcv87ML9FDcVXtx5ARFne3RerzLhOj4zsE+Wno23Y+qJZCypIjpxF\nGoUZNC2lULoE5bZx9j2t+Ua8QFkz+lB8gN62loHeHtEtusn2ifODi/O30xeH2BMT\nHGal16mB1zPO6S7M0Vbftft++QKBgQDD3pL2+ln38SzpXg+eyG9piHA4WVYpH7oh\nqFLhjLRONKLNNe4FtfiauUoKxvc6KhFIpMy9AoyGuI5nPxqVTS7Seoq/YeGYnB+R\nFyxjiFDkx6DkYFRndgrq3kxVwmOEX8pQZhaTsi3NgN2SwfC+QsPmwxGJmmpIaA22\nqRZe4zd8hQKBgE2CPQXQ/OX1AEhFTAPB7hp5PNhHN8G7WuslwmJTvO2gFlkCeDAA\nnY/ALa8TasHj5fKnui2JFYsopNG45JKTgUJPnqJP4029/5ECFe1GI7FODZ3/YENU\nT7yGeYndTo7IuHFkI0txHVTI7q91U8ys0FULoy39eHym8/LWNz8S2+L5AoGAB4+2\nGLa9dmbnFvM8oyKVuns76dD5FIlXBCmdWXu3EjXR+x4T3ECUIlT42MWpkaNCG43R\nIZLRnfnN9YpoGk9qeVGlvZGnxd5xEYbVfdorVUmnmmllmMDj1wFR7RWeBeQ0yTnH\nsVf1kLNi2mGGS7IEIgpxyOAfLkBmFyEb7fnTkIkCgYACrn3H9x4/irqefc0NHp2/\n2cDI4uGpcqkxgm8FOOSGwn4U1+ayyTqRZK8pKFs5YDcuZ8ZsCbYBKdnIX/BbH5FU\n+2Bhca10+gJRQ/XavfrynXnoNTEt1BVmW+ZSHTlZXOocnSF0dFQIWJ1R+9UasPLK\n67TlGymC7343WegdK2ZJ+A==\n-----END PRIVATE KEY-----\n",
            clientEmail: "grozdanovgg@pool-hopping-206921.iam.gserviceaccount.com",
            // "client_id": "101318169724394579110",
            // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            // "token_uri": "https://accounts.google.com/o/oauth2/token",
            // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/grozdanovgg%40pool-hopping-206921.iam.gserviceaccount.com"
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://pool-hopping.firebaseio.com'
        });

        const db = admin.firestore();



    }
}