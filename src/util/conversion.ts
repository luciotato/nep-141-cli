// 5 decimals and thousands sep
export function yton(yoctos:string):string {
    let units = yoctos
    if (units.length < 25) units = units.padStart(25, '0')
    units = units.slice(0, -24) + "." + units.slice(-24, -19)
    return addCommas(units)
}

/**
 * adds commas to a string number 
 * @param {string} str 
 */
 export function addCommas(str:string) {
    let n = str.indexOf(".")
    if (n==-1) n=str.length
    n -= 4
    while (n >= 0) {
        str = str.slice(0, n + 1) + "," + str.slice(n + 1)
        n = n - 3
    }
    return str;
  }
  