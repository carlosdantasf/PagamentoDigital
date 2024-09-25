import AxiosConfig from "./AxiosConfig.ts";

export default class TicketsService {
    public getAllTickets = async () => {
        return await AxiosConfig
            .get("tickets")
            .then(res => res.data)
            .catch(err => console.log('Unexpected error' + err));
    }
}