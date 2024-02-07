// В types.ts
interface ApiResponse<T> {
  data: T;
}

interface GroupDetailsProps {
  groupDetails: Group;
}

interface Group {
  contacts: string;
  group_code: string;
  group_id: number;
  group_status: string;
  course: number;
  pasport_details: string;
  photo: string;
  size: string;
  students: number;
}

export type { Group, ApiResponse, GroupDetailsProps };
