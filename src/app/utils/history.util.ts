import { Film } from "../models/film.model";

export class HistoryUtil {
    public static add(data: Film) {
        let history = this.get();

        if(history.some(x => x.id == data.id))
            return

        if(history.length > 50)
            history.shift();

        history.push(data)
        localStorage.setItem('filmSpinHistory', JSON.stringify(history));
    }

    public static get(): Film[] {
        const data = localStorage.getItem('filmSpinHistory');
        if(!data)
            return [];
        return JSON.parse(data);
    }
}