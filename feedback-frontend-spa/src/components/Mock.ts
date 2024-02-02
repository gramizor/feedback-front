import GroupData from "./loadingGroup";
import almaz from "/almaz.png";
import iu5 from "/iu5.png";
import bmstu from "/bmstu.png";


const Mock: GroupData[] = [
    {
        group_id: 1,
        group_code: 'РТ5-51Б',
        contacts: '+7(999) 999-99-99',
        course: 3,
        students: 24,
        group_status: 'обучается',
        photo: almaz,
    },
    {
        group_id: 2,
        group_code: 'ИУ5-51Б',
        contacts: '+7(999) 999-88-88',
        course: 3,
        students: 20,
        group_status: 'обучается',
        photo: iu5,
    },
    {
        group_id: 3,
        group_code: 'ИУ5Ц-72Б',
        contacts: '+7(999) 999-66-66',
        course: 4,
        students: 3,
        group_status: 'обучается',
        photo: bmstu,
    },
];
export default Mock;