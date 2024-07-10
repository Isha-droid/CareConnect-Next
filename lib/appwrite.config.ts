import * as sdk from 'node-appwrite'
const {
PROJECT_ID,
API_KEY,
PATIENT_COLLECTION_ID ,
DOCTOR_COLLECTION_ID,
APPOINTMENT_COLLECTION_ID,
NEXT_PUBLIC_BUCKET_ID,
NEXT_PUBLIC_ENDPOINT:ENDPOINT
}= process.env;
const client = new sdk.Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('668e5971001a7ea09f6f').setKey('3f41134d5dc52032bc62def8195f7a0e3d08125337b2732b631e72f0ad8306fe5a578454976d72fd28b48a840dc520e95292c950268f0c58c39b8bda21fa282a28579ef519967fd387f863e74154016ec7492efe211296ed9535f053d8033ed2869fae7e0bb4a4e1095b0a68ab5d7ade5bc7fdb1d7ff636d88ad4924c8ab1ab1')
export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)
