export const fetchBasePath = () => {
    //  fetch the parent path and return. example http://localhost:5174/customer the basepath is customer

    const pathArray = window.location.pathname.split('/');
    if (pathArray.length > 1) {
        return `/${pathArray[1]}`;
    }
}