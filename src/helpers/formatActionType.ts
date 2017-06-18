

export const TYPE_DELIMITER: string = '.';

export function getTypeByParentName(type: string, parent_name: string = '') {
    return `${parent_name ? `${parent_name}${TYPE_DELIMITER}` : ''}${type}`;
}