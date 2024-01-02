/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("../services/auth").Auth;
	type DatabaseUserAttributes = {
		username: string;
	};
	type DatabaseSessionAttributes = {
		username: string;
	};
}
