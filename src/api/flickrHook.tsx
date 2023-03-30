import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import type { SWRConfiguration } from 'swr'
import { useEffect } from 'react';

// Api Doc
// https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
// https://www.flickr.com/services/api/misc.urls.html

const flickr_getPhotos_endpoint = 'https://www.flickr.com/services/rest/';
const params = {
	method: 'flickr.photosets.getPhotos',
	api_key: 'f910b5ee8cd9e462c7c5b9642b48109d',
	photoset_id: '72157719490538555',
	user_id: '122563583@N07',
	extras: 'url_o',
	per_page: '20',
	format: 'json',
	nojsoncallback: '1',
};

interface FlickrPhoto {
	farm: number;
	height_o: number;
	id: string;
	isfamily: number;
	isfriend: number;
	isprimary: string;
	ispublic: number;
	secret: string;
	server: string;
	title: string;
	url_o: string;
	width_o: number;
}

interface FlickrData {
	photoset: {
		id: string;
		owner: string;
		ownername: string;
		page: number;
		pages: number;
		per_page: string;
		perpage: string;
		photo: Array<FlickrPhoto>;
		primary: string;
		title: string; // album titel
		total: number;
	};
	stat: string;
}

const replaceCharAt = (originString: string, index: number, replacement: string) => {
	return originString.substr(0, index) + replacement + originString.substr(index + replacement.length);
};

const setOriginToBig = (originData: FlickrData): FlickrData => {
	const photos = originData.photoset.photo;
	const newPhotos = photos.map((photo) => {
		const stringLength = photo.url_o.length;
		return { ...photo, url_o: replaceCharAt(photo.url_o, stringLength - 5, 'h') };
	});

	const newData = { ...originData, photoset: { ...originData.photoset, photo: newPhotos } };
	return newData;
};

export const useFlickrGetPhotos = (config?: SWRConfiguration) => {
	const url = new URL(flickr_getPhotos_endpoint);
	Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

	const { data, error } = useSWR<FlickrData, Error>(url.href, fetcher, config);

	const newData = data ? setOriginToBig(data) : data;

	return {
		photos: newData,
		error,
	};
};
