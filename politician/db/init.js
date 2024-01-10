import adminModel from "../model/admin/admin.js";
// import constituencModel from "../model/constituency/constituency.js";
import constituencyModel from "../model/constituency/constituency.js";
import pollingStationModel from "../model/constituency/pollingStation.js";
// import constituencyModel from "../model/constituency/constituency.js";
// import pollingStationModel from "../model/constituency/pollingStation.js";
import eventsModel from "../model/events/events.js";
import membersModel from "../model/members/members.js";
import newsCommentsModel from "../model/news/newsCommentModel.js";
import newsModel from "../model/news/news.js";
// import newsLikeModel from "../model/news/newsLikeSModel.js";
import socialActivityModel from "../model/socialActivity/socialActivity.js";
import socialActivityCommentModel from "../model/socialActivity/socialActivityCommentModel.js";
// import socialActivityLikeModel from "../model/socialActivity/socialActivityLikeModel.js";

const initDB = async () => {
  await adminModel.sync({
    alter: true,
    force: false,
  });
  await pollingStationModel.sync({
    alter: true,
    force: false,
  });
  await constituencyModel.sync({
    alter: true,
    force: false,
  });
  // await constituencModel.sync({
  //   alter: true,
  //   force: false,
  // });
  // await constituencyModel.sync({
  //   alter: true,
  //   force: false,
  // });
  await eventsModel.sync({
    alter: true,
    force: false,
  });
  await membersModel.sync({
    alter: true,
    force: false,
  });
  await newsCommentsModel.sync({
    alter: true,
    force: false,
  });
  await newsModel.sync({
    alter: true,
    force: false,
  });
  // await newsLikeModel.sync({
  //   alter: true,
  //   force: false,
  // });
 
  await socialActivityModel.sync({
    alter: true,
    force: false,
  });
  // await socialActivityLikeModel.sync({
  //   alter: true,
  //   force: false,
  // });
  await socialActivityCommentModel.sync({
    alter: true,
    force: false,
  });
};
export default initDB;
