
export const getBooleanFromENV = (value_name, default_value = false) => {
    //console.log(value_name, typeof process.env[value_name], process.env[value_name], typeof process.env[value_name] === "string" ? JSON.parse(process.env[value_name]) : default_value);
    return typeof process.env[value_name] === 'string' ? JSON.parse(process.env[value_name]) : default_value;
};