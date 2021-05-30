import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-firebase-blog-50690-default-rtdb.asia-southeast1.firebasedatabase.app'
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;