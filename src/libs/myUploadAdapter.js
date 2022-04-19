import axios from 'axios';

// class 是js的建構函式
class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    const formData = new FormData();
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
    // this.loader 就是回傳的檔案，而我們上傳的檔案，就是loader下面的file，而file是promise格式
    // resolve的功能，是送給CKEdit使用
    // 回傳是屬於非同步行為，所以會建一個新的Promise
    // headers的目的是做驗證
    return new Promise((resolve) => {
      this.loader.file.then((loadFile) => {
        formData.append('file-to-upload', loadFile);
        return axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response.data.imageUrl);
            resolve({
              default: response.data.imageUrl,
            });
          });
      });
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

// 匯出檔案
export default MyUploadAdapter;
