import { context } from "@/context";
import { Layout } from "@/pages/layout";
import { Html } from "@elysiajs/html";
import Elysia from "elysia";

export const signup = new Elysia().use(context).get("/signup", () => {
	return (
		<Layout
			title="Signup"
			head={
				<>
					<script type="text/hyperscript">{`
						def validate(value, placeholder, length)
							if not fieldValidations
								set global fieldValidations to {Username: false, Password: false}
							end

							if value is empty
								set fieldValidations[placeholder] to false
								return placeholder + ' is required'
							end

							if value is not empty and value.length < length
								set fieldValidations[placeholder] to false
								return placeholder + ' must have at least ' + length + ' characters'
							end
							
							set fieldValidations[placeholder] to true

							return ''
						end

						def isValidForm()
							if fieldValidations.Username and fieldValidations.Password
								remove @disabled from #submit-btn
							else
								add @disabled to #submit-btn
							end
						end
					`}</script>
				</>
			}
		>
			<div class="main-card w-fit">
				<form
					class="flex flex-col gap-5"
					autocomplete="off"
					hx-post="/api/auth/sign-up"
				>
					<h1 class="text-3xl font-bold">SignUp</h1>
					<Input
						id="username"
						name="username"
						label="username"
						placeholder="Username"
						script="on input 
							put validate(my.value, 'Username', 5) into #username-error.innerHTML
							isValidForm()
						"
					/>

					<Input
						id="password"
						name="password"
						label="password"
						placeholder="Password"
						type="password"
						script="on input 
							put validate(my.value, 'Password', 10) into #password-error.innerHTML
							isValidForm()
						"
					>
						<span
							class="icon-eye w-5 h-5 absolute top-1/2 translate-y-[-50%] right-[5px] cursor-pointer"
							_="on click
									if not show
										set element show to true
										add @type='text' to #password
										remove .icon-eye from me
										add .icon-eye-slash to me
									else
										set element show to false
										add @type='password' to #password
										add .icon-eye to me
										remove .icon-eye-slash from me
									end
								"
						/>
					</Input>

					<button
						type="submit"
						id="submit-btn"
						class="w-auto bg-black rounded-md text-white p-2 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-gray-300"
						disabled
						_="on click call Swal.fire({  title: 'Error!',
						text: 'Do you want to continue',
						icon: 'error',
						confirmButtonText: 'Cool'})"
					>
						Submit
					</button>
				</form>
				<a href="/" class="anchor text-sm">
					Back to Home
				</a>
			</div>
		</Layout>
	);
});

type InputProps = {
	name: string;
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	script?: string;
};

function Input(props: Html.PropsWithChildren<InputProps>): JSX.Element {
	return (
		<div class="input-wrapper">
			<label for={props.id} class="input-wrapper__label">
				{props.placeholder}
			</label>
			<input
				class="input-wrapper__input"
				name={props.name}
				id={props.id}
				placeholder={props.placeholder}
				type={props.type}
				_={props?.script}
			/>
			<small class="input-wrapper__error" id={`${props.id}-error`}>
				{""}
			</small>
			{props?.children}
		</div>
	);
}
