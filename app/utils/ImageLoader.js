import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { showAlert } from './Message';

const imageOptions = {
    mediaType: 'photo',
    maxWidth: 900,
    maxHeight: 900,
    includeBase64 : true,
    quality : 0.9,
    
}



const videoOptions = {
    mediaType: 'video',
    maxWidth: 450,
    maxHeight: 450,
    includeBase64 : true,
    quality : 0.7,
    
}

export const capturedImage = () => new Promise((resolve) => {
    launchCamera(imageOptions,response => {

        console.log('[ImageLoader.js] Camera Image : ',response)
        if(response.didCancel){
            return;
        }else if(response.errorCode === 'camera_unavailable'){
            showAlert('error','Camera is unavailable.')
            return;
        }

        const asset = response.assets[0]

        const image = {
            uri : asset.uri,
            name : asset.fileName,
            type : asset.type,
            base64 : `data:image/jpeg;base64,${asset.base64}`
        }
        resolve(image)
    })
})



export const capturedSelfie = () => new Promise((resolve) => {
    launchCamera({...imageOptions,cameraType:'front'},response => {

        console.log('[ImageLoader.js] Camera Image : ',response)
        if(response.didCancel){
            return;
        }else if(response.errorCode === 'camera_unavailable'){
            showAlert('error','Camera is unavailable.')
            return;
        }

        const asset = response.assets[0]

        const image = {
            uri : asset.uri,
            name : asset.fileName,
            type : asset.type,
            base64 : `data:image/jpeg;base64,${asset.base64}`
        }
        resolve(image)
    })
})


export const getGalleryImage = () => new Promise((resolve) => {
    launchImageLibrary(imageOptions,response => {

        if(response.didCancel){
            return;
        }
        
        const asset = response.assets[0]

        const image = {
            uri : asset.uri,
            name : asset.fileName,
            type : asset.type,
            base64 : `data:image/jpeg;base64,${asset.base64}`
        }

        // if(hasBase64){
        //     image.base64 = `data:image/jpeg;base64,${asset.base64}`
        // }

        // console.log('[ImageLoader.js] Gallery Image : ',asset)
        resolve(image)

    })
})



export const getVideo = () => new Promise((resolve) => {
    launchImageLibrary(videoOptions,response => {

        if(response.didCancel){
            return;
        }
        
        const asset = response.assets[0]

        console.log('[ImageLoader.js] video: ',response)

        const video = {
            uri : asset.uri,
        }

        resolve(video)

    })
})