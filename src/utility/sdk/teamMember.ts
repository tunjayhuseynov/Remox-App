import { AxiosInstance } from "axios";
import { AddMember, AddMemberResponse } from "../../types/sdk/TeamMember/addMember";
import { GetMember, GetMemberResponse } from "../../types/sdk/TeamMember/getMember";
import { UpdateMember, UpdateMemberResponse } from "../../types/sdk/TeamMember/updatemember";


class TeamMember {
    instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    async AddMember(member: AddMember) {
        try {
            const req = await this.instance.post<AddMemberResponse>("/team-member/add", member)
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async GetMembers(id: string, query?: GetMember) {
        try {
            const req = await this.instance.get<GetMemberResponse>(`/team-member/byTeam/${id}`, { params: query })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async DeleteMember(id: string) {
        try {
            const req = await this.instance.delete(`/team-member/${id}`)
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async UpdateMember(data: UpdateMember) {
        try {
            const req = await this.instance.put<UpdateMemberResponse>(`/team-member`, data)
            return req.data;
        } catch (error) {
            throw error
        }
    }
}

export default TeamMember;