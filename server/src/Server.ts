import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as path from "path";
import "@tsed/mongoose";

const rootDir = __dirname;
const clientDir = path.join(rootDir, "../../client/build");

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8000,
  httpsPort: false,
  mongoose: {
    urls: {
      default: {
        url: process.env.mongoose_url || "mongodb://127.0.0.1:27017/anono",
        connectionOptions: {
          autoIndex: false,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      }
    }
  },
  statics: {
    "/": clientDir
  }
})
export class Server extends ServerLoader {
  constructor(settings) {
    super(settings);
  }
  
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }

  $afterRoutesInit() {
    this.expressApp.get(`*`, (_, res) => {
      res.sendFile(path.join(clientDir, "index.html"));
    });
  }
}