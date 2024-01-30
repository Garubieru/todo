
export function Input(props: Html.PropsWithChildren<InputProps>): JSX.Element {
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

export type InputProps = {
	name: string;
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	script?: string;
};
