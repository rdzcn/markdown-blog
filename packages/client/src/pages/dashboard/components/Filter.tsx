import { Txt } from "@contexts/texts.context";
import {
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from "@mui/material";
import type { TransactionStatus } from "@types/index";
import { useRef, useState } from "react";
import { Event } from "../dashboard.reducer";
import { FilterWrapper } from "../dashboard.styles";

interface SelectOption {
	id: string;
	label: string;
}
interface FilterProps {
	statuses: SelectOption[];
	filterHandler: ({
		filterType,
		filterValue,
	}: {
		filterType: "status";
		filterValue: TransactionStatus;
	}) => void;
	selectedFilter: TransactionStatus | undefined;
}

const Filter = ({ statuses, filterHandler, selectedFilter }: FilterProps) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const handleMenuItemClick = (option: SelectOption) => {
		filterHandler({
			filterType: "status",
			filterValue: option.id as TransactionStatus,
		});
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: MouseEvent | TouchEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<FilterWrapper>
			<ButtonGroup
				ref={anchorRef}
				variant="text"
				aria-label="menu button"
				disableRipple
				disableElevation
			>
				<Button variant="text" onClick={handleToggle}>
					<Txt
						txtKey={`Status filter${selectedFilter ? `: ${selectedFilter}` : ""}`}
						variant="button"
					/>
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					minWidth: 200,
				}}
				open={open}
				anchorEl={anchorRef.current}
				transition
				placement="bottom"
			>
				{({ TransitionProps, placement }: any) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom" ? "center top" : "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{statuses.map((status: SelectOption) => (
										<MenuItem
											key={status.id}
											onClick={() => handleMenuItemClick(status)}
										>
											{status.label}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</FilterWrapper>
	);
};

export default Filter;
