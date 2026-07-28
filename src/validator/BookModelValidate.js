exports.getYear = (year) => {
    const publishYear = new Date().getFullYear();
    // console.log(publishYear)
    return  year >= 1100 && year <= publishYear;
}

exports.getRating = (rating) => {
    return rating >=0 && rating <= 5;
}