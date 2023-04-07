export function date_format(date,include_year){
    const day = pad_start(date.getDate().toString(),2);
    const month = pad_start((date.getMonth() + 1).toString(),2);
    
    if(include_year!=false){
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    return `${day}-${month}`;

}

export function get_random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function pad_start(v,length,string){
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(padString || ' ');
            if (this.length >= targetLength) {
            return String(this);
            } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
            }
        };
    }

    if(!string) string='0';

    return (v+"").padStart(length,string);
}

export function financial_format(num){
    const separator = '.';
    let num_string = num.toString();
    let num_parts = num_string.split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return num_parts.join('.');
}
  