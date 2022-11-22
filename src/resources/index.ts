import Stock from "./stock";
import Expenses from "./expenses";
import Legalize from "./legalize";
import Sales from "./sales";
import TrackableJobs from "./trackable_jobs";
import Cash from "./cash";

export default class Resources {
  public sales: Sales = new Sales();
  public expenses: Expenses = new Expenses();
  public legalize: Legalize = new Legalize();
  public stock: Stock = new Stock();
  public trackable_jobs: TrackableJobs = new TrackableJobs();
  public cash: Cash = new Cash();
}
