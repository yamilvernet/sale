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

export function is_set(value){
    return value!=undefined && value!=null;
}

export function has_text(variable) {
    // Comprobar si la variable no es nula, no indefinida y no falsa
    if (variable && typeof variable === 'string') {
      // Comprobar si el texto no está vacío
      if (variable.trim() !== '') {
        return true; // La variable contiene texto válido
      }
    }
    return false; // La variable no contiene texto válido
}

export function is_number(value){
    if (!is_set(value)) return false
    
    let normalized_value = value
    
    let is_text_value = has_text(value)
    if(is_text_value) {
        normalized_value.replaceAll(',','.');
    }

    return !isNaN(parseFloat(normalized_value))
}

export function capitalize(value) {
    // Si la palabra es null, undefined o no es una cadena, devuelve una cadena vacía
    if (value == null || typeof value !== 'string') {
        return '';
    }

    // Capitaliza la primera letra y convierte las demás a minúsculas
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function capitalize_words(sentence) {
    const avoidCapitalization = new Set(['la', 'las', 'los', 'les', 'de', 'a', 'o', 'y', 'en', 'con', 'para', 'por', 'del']);

    return sentence.toLowerCase().replace(/\b\w+\b/g, function(word) {
        // Si la palabra no está en el conjunto de palabras a evitar capitalizar, capitalizarla
        if (!avoidCapitalization.has(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    });
}

export function format_price(number) {
    // Redondear el número al entero más cercano
    const roundedNumber = Math.round(number);
    // Convertir el número a string y usar una expresión regular para formatear con el punto de miles
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function set_default(obj, key, value) {
    if (!(key in obj)) {
        obj[key] = value;
    }
    return obj;
}