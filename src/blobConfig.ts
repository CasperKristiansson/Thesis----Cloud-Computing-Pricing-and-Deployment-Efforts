// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, BlockBlobParallelUploadOptions, ContainerClient } from "@azure/storage-blob";

const containerName = `fileupload`;
const sasToken = 'sp=racwdli&st=2023-06-04T19:34:29Z&se=2024-12-17T16:34:29Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=MNQ%2BGAQepInyv%2BmLSAu1ZJfAGKJ5kAefORHZxFZcNVY%3D';
const storageAccountName = 'amaceitticketsyste08d78c';
// </snippet_package>

// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
console.log(uploadUrl);

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);

// get Container - full public read access
const containerClient: ContainerClient =
  blobService.getContainerClient(containerName);
// </snippet_get_client>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobsInContainer = async (id: string) => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat({ prefix: id })) {
    console.log(`${blob.properties.contentLength} - ${blob.name}`);

    const size = blob.properties.contentLength ?? 0;
    let sizeWithPrefix = "";
    if (size > 1000000) {
      sizeWithPrefix = `${(size / 1000000).toFixed(2)} MB`;
    } else {
      sizeWithPrefix = `${(size / 1000).toFixed(2)} KB`;
    }

    const blobItem = {
      name: blob.name.split("_")[1],
      size: sizeWithPrefix,
      createdOn: blob.properties.createdOn?.toDateString(),
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
    }

    // if image is public, just construct URL
    returnedBlobUrls.push(blobItem);
  }

  return returnedBlobUrls;
};
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file: File, id: string) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(id + "_" + file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } } as BlockBlobParallelUploadOptions;

  // upload file
  await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File | null, id: string): Promise<void> => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file, id);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;