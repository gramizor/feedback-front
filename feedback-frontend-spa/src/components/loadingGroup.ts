import loadingPhoto from "/loading-thinking.gif";

export interface GroupData {
    group_id: number;
    group_code: string;
    contacts: string;
    course: number;
    students: number;
    group_status: string;
    photo: string;
}

export const loadingGroup: GroupData = {
    group_id: 0,
    group_code: 'Загрузка...',
    contacts: 'Загрузка...',
    course: 0,
    students: 0,
    group_status: 'Загрузка...',
    photo: loadingPhoto,
};