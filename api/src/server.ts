import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { randomBytes } from "node:crypto";
import { User } from "#contract/user";
import { Festival} from "#contract/festival";

const PORT = 8000;

interface UserData extends User {
  password: string;
}

type Data = Record<string, any>;

interface Result {
  body: Record<string, any>;
  status: number;
  headers: Record<string, string>;
}

const USERS: UserData[] = [];

const FESTIVALS: Festival[] = [
	{
		id: "bG9yZW1JcHN1bUZlc3RpdmFs",
		name: "Lorem Ipsum Festival",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices efficitur massa, sed sagittis nisi scelerisque vitae. Aliquam pretium ante eu ligula aliquet tempus. Sed suscipit orci quis lectus tempor, sit amet commodo quam lobortis. Vestibulum aliquet risus quam, eget mollis urna porttitor eu. Phasellus in magna justo. Integer hendrerit facilisis porta. Nunc sed ipsum volutpat, ullamcorper libero ac, tempus diam. Nam scelerisque felis nec arcu suscipit feugiat. Pellentesque feugiat massa sit amet metus ornare mollis. Nunc ac justo congue, cursus ipsum nec, pellentesque turpis. Aenean auctor aliquet efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent luctus eros ac nibh auctor, faucibus blandit nisi finibus."
	}
]


const server = createServer(requestListener);

server.listen(PORT);
console.log(`Server working on http://localhost:${PORT}`);

async function requestListener(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const method = req.method;

    let result: Result;
    if (method === "OPTIONS") {
      result = { status: 200, body: {}, headers: {} };
    } else if (url.pathname === "/users/register" && method === "POST") {
      const body = await getBody(req);
      result = userRegister(body);
    } else if (url.pathname === "/users/login" && method === "POST") {
      const body = await getBody(req);
      result = userLogin(body);
    } else if (url.pathname === "/users/account/top-up" && method === "POST") {
      const body = await getBody(req);
      result = userAccountTopUp(body);
    } else if (url.pathname === "/festivals/list" && method === "POST") {
      const body = await getBody(req);
      result = festivalsList(body);		
    } else if (url.pathname === "/festivals/info" && method === "POST") {
      const body = await getBody(req);
      result = festivalsInfo(body);		
    } else {
      result = { status: 404, headers: {}, body: {} };
    }

    console.log(
      `${req.method?.padStart(7, " ")}   ${req.url?.padEnd(105, " ")}  ${result.status}`,
    );
    res.writeHead(result.status, {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Method": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      ...result.headers,
    });
    res.end(JSON.stringify(result.body));
  } catch (e) {
    console.error(e);
  }
}

function getBody(request: IncomingMessage): Promise<Data> {
  return new Promise((resolve, reject) => {
    const bodyParts: any[] = [];
    request.on("data", (chunk) => {
      bodyParts.push(chunk);
    });
    request.on("end", () => {
      const body = Buffer.concat(bodyParts).toString();
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function userRegister(data: Data): Result {
  if (
    !data.email ||
    typeof data.email !== "string" ||
    !data.password ||
    typeof data.password !== "string"
  ) {
    return {
      status: 400,
      body: { error: "Email or password missing" },
      headers: {},
    };
  }

  if (USERS.find((it) => it.email === data.email)) {
    return {
      status: 400,
      body: { error: "User with that email already exists" },
      headers: {},
    };
  }

  const user: UserData = {
    id: randomBytes(16).toString("hex"),
    email: data.email,
    password: data.password,
    balance: 0,
  };

  USERS.push(user);
  return { status: 201, body: { ...user, password: undefined }, headers: {} };
}

function userLogin(data: Data): Result {
  if (
    !data.email ||
    typeof data.email !== "string" ||
    !data.password ||
    typeof data.password !== "string"
  ) {
    return {
      status: 400,
      body: { error: "Invalid email or password" },
      headers: {},
    };
  }

  const user = USERS.find(
    (it) => it.email === data.email && it.password === data.password,
  );

  if (!user) {
    return {
      status: 400,
      body: { error: "Invalid email or password" },
      headers: {},
    };
  }

  return { status: 200, body: { ...user, password: undefined }, headers: {} };
}

function userAccountTopUp(data: Data): Result {
  if (
    !data.userId ||
    typeof data.userId !== "string" ||
    !data.amount ||
    typeof data.amount !== "number"
  ) {
    return {
      status: 400,
      body: { error: "Invalid request" },
      headers: {},
    };
  }

  const user = USERS.find((it) => it.id === data.userId);

  if (!user) {
    return {
      status: 404,
      body: { error: "Given user does not exist" },
      headers: {},
    };
  }

  user.balance += data.amount;

  return { status: 200, body: { newBalance: user.balance }, headers: {} };
}

function festivalsList(data: Data): Result {
	if (
    !data.userId ||
    typeof data.userId !== "string"
  ) {
    return {
      status: 400,
      body: { error: "Invalid request" },
      headers: {},
    };
  }

  const user = USERS.find((it) => it.id === data.userId);

	if (!user) {
    return {
      status: 401,
      body: { error: "Please login to access information" },
      headers: {},
    };
  }

  return { status: 200, body: { festivals: FESTIVALS }, headers: {} };
}

function festivalsInfo(data: Data): Result {
	if (
    !data.userId ||
    typeof data.userId !== "string" ||
    !data.festivalId ||
    typeof data.festivalId !== "string"		
  ) {
    return {
      status: 400,
      body: { error: "Invalid request" },
      headers: {},
    };
  }

  const user = USERS.find((it) => it.id === data.userId);

	if (!user) {
    return {
      status: 401,
      body: { error: "Please login to access information" },
      headers: {},
    };
  }

  const festival = FESTIVALS.find((it) => it.id === data.festivalId);

	if (!festival) {
    return {
      status: 404,
      body: { error: "Festival not found" },
      headers: {},
    };
  }

  return { status: 200, body: { festival }, headers: {} };
}