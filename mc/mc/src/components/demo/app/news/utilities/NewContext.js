import React, { createContext, useState } from 'react'
import AxiosInstance from '../../axiosClient/AxiosInstance';


export const NewContext = createContext();

export const NewProvider = (props) => {
    const { children } = props;

    // lấy danh sách bài viết
    const getNews = async () => {
        try {
            const response = await AxiosInstance().get('/articles');
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('getNews Error: ', error);
        }
        return [];
    }

    // lấy thông tin chi tiết 1 bài viết
    const getDetail = async (id) => {
        try {
            const response = await AxiosInstance().get(`/articles/${id}/detail`);
            return response.data[0];
        
        } catch (error) {
            console.log('Get Detail error: ', error);
        }
        return null;
    }

    // upload hình ảnh lên server
    const uploadImage = async(formData) =>{
        try {
            const response = await AxiosInstance('multipart/form-data')
                            .post(`media/upload`, formData);
            return response.data;
        } catch (error) {
            console.log("Up load error:", error);
            
        }
        return null;
    }

    // lưu bài viết
    const saveNews = async (title, content, image)=>{
        try {
            const body = {
                title,
                content,
                image,
            }
            await AxiosInstance().post('/articles', body);
            return true;
        } catch (error) {
            console.log('save news error: ', error);
        }
        return false;
    }

    return (
        <NewContext.Provider value={{ getNews, getDetail, uploadImage, saveNews }}>
            {children}
        </NewContext.Provider>
    )
}