interface Timestamp {
    seconds: number,
    nanoseconds: number
}

//날짜 포맷
export const FormatDate = (timestamp:Timestamp) => {
    const date:Date = new Date(timestamp.seconds * 1000);
    const yyyy:number = date.getFullYear();
    let mm:string = String(date.getMonth() + 1);
    let dd:string = String(date.getDate());

    if(mm.toString().length < 2) {
        mm = `0${mm}`;
    }

    if(dd.toString().length < 2) {
        dd = `0${dd}`;
    }

    return `${yyyy}-${mm}-${dd}`;
}