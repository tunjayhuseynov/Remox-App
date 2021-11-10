import { AxiosInstance } from "axios";
import { CreateTeam, CreateTeamResponse } from "../../types/sdk/Team/CreateTeam";
import { GetTeams, GetTeamsResponse } from "../../types/sdk/Team/GetTeams";
import { UpdateTeam, UpdateTeamResponse } from "../../types/sdk/Team/UpdateTeam";

class Team {
    instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    async CreateTeam(title: CreateTeam) {
        try {
            const req = await this.instance.post<CreateTeamResponse>("/team/create", title)
            return req.data;
        } catch (error) {
            throw error            
        }
    }

    async GetTeams(query?: GetTeams) {
        try {
            const req = await this.instance.get<GetTeamsResponse>("/team/byAccount", { params: query })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async DeleteTeam(id: number) {
        try {
            const req = await this.instance.delete(`/team/${id}`)
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async UpdateTeam(id: number, data: UpdateTeam) {
        try {
            const req = await this.instance.patch<UpdateTeamResponse>(`/team/${id}`, data)
            return req.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export default Team;