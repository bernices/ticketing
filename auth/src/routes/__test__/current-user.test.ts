import request from "supertest";
import { app } from "../../app";

it("responses with details about the current user", async () => {
  const cookie = await signin();

  console.log("cookie = " + cookie);
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const respond = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(respond.body.currentUser).toEqual(null);
});
