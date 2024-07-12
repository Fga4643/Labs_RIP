import {AxiosResponse} from "axios";

export interface Spare {
	id: number,
	name: string,
	description: string,
	image: string,
	status: number,
	price: number,
	weight: number,
	condition: number,
	rating: number
}

export type Response = Promise<AxiosResponse> | any