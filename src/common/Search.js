export const Search = (list, term) => {
    return list.some(item => {

        Object.keys(item).forEach(key => {

            return String(serviceMapper[key]).toLowerCase().includes(String(term).toLowerCase())


        })





    });

}


const serviceMapper = {
    "name": "name",
    "price": "price",
    "duration": "duration",
    "estatus": "estatus",
}