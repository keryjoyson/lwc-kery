import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFileToServer from '@salesforce/apex/FileUploadController.uploadFileToServer';

export default class FileUpload extends LightningElement {
    @api recordId; // You can use this if you want to associate the uploaded file with a record.
    file;
    
    handleFileChange(event) {
        this.file = event.target.files[0];
    }

    uploadFile() {
        if (this.file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                uploadFileToServer({ parentId: this.recordId, fileName: this.file.name, base64Data: base64 })
                    .then(result => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'File uploaded successfully.',
                                variant: 'success',
                            })
                        );
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error',
                                message: 'Error uploading file: ' + error.message,
                                variant: 'error',
                            })
                        );
                    });
            };
            reader.readAsDataURL(this.file);
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'No file selected.',
                    variant: 'error',
                })
            );
        }
    }
}
