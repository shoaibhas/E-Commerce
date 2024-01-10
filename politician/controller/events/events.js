import eventsModel from "../../model/events/events.js";

const eventController = {
  create: async (req, res) => {
    try {
      const { eventTitle, eventDate, eventDescription, eventImage } = req.body;
      const event = await eventsModel.create({
        eventTitle,
        eventDate,
        eventDescription,
        eventImage,
        adminId: req.session.userAdmin?.id,
        memberId: req.session.userMember?.id,
      });
      return res.status(200).json({ message: `Event Create`, event });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  getall: async (req, res) => {
    try {
      const event = await eventsModel.findAll();
      return res.status(200).json({ message: `Your Events`, event });
    } catch (error) {
      return res.json({ message: `some bad happened`, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { eventTitle, eventDate, eventDescription, eventImage } =
        req.body;
      const event = await eventsModel.findOne({
        where: { id },
      });
      if (!event) {
        return res.status(201).json({ message: `Not Found` });
      }
      (event.eventTitle = eventTitle),
        (event.eventDate = eventDate),
        (event.eventDescription = eventDescription),
        (event.eventImage = eventImage),
        (event.adminId=req.session.userAdmin?.id);
        (event.memberId=req.session.userMember?.id);
        // console.log(event);
      await event.save();
      return res.status(200).json({ message: `Update Successfully`, event });
    } catch (error) {
      return res.status(201).json({ message: `some bad happened`, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await eventsModel.findOne({ where: { id } });
      if (!event) {
        return res.status(201).json({ message: `Event Not Found` });
      }
      await event.destroy();
      return res.status(200).json({ message: `Delete Event` });
    } catch (error) {
      return res.status(400).json({ message: `some bad happened`, error });
    }
  },
};
export default eventController;
