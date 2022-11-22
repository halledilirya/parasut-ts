import { send } from "../../utils/requests";

export default class TrackableJobs {
  /**
   * @param id string
   * @returns Promise<{@link ShowTrackableJobsResponse}>
   */
  async retrieve(id: string): Promise<ShowTrackableJobsResponse> {
    const response = await send({
      path: `/trackable_jobs/${id}`,
      method: "GET",
    });
    return response as ShowTrackableJobsResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link ShowTrackableJobsResponse}>
   */
  async showTrackableJob(id: string): Promise<ShowTrackableJobsResponse> {
    return await this.retrieve(id);
  }
}

export type ShowTrackableJobsResponse = {
  data: {
    id: string;
    type: "trackable_jobs";
    attributes: {
      status: "running" | "done" | "error";
      errors: string[];
    };
    relationships: any;
  };
  errors?: {
    title: string;
    detail: string;
  }[];
};
