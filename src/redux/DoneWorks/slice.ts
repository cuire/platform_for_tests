import { DoneWorkType } from "@/types/doneWork";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DoneWorksStateType = {
	doneWorks: DoneWorkType[];
	doneWorksIsLoading: boolean;
	doneWorksIsError: boolean;
};

const initialState: DoneWorksStateType = {
	doneWorks: [],
	doneWorksIsLoading: false,
	doneWorksIsError: false,
};

const NAME = "doneWorks";

const requestDoneWorks: CaseReducer<DoneWorksStateType> = (state) => {
	state.doneWorksIsLoading = true;
	state.doneWorksIsError = false;
};

const successDoneWorks: CaseReducer<
DoneWorksStateType,
	PayloadAction<DoneWorkType[]>
> = (state, { payload }) => {
	state.doneWorksIsLoading = false;
	state.doneWorksIsError = false;
	state.doneWorks = payload;
};

const failureDoneWorks: CaseReducer<DoneWorksStateType> = (state) => {
	state.doneWorksIsLoading = false;
	state.doneWorksIsError = true;
};

export const { reducer: DoneWorksReducer, actions:DoneWorksActions } = createSlice(
	{
		name: NAME,
		initialState,
		reducers: {
			requestDoneWorks,
			successDoneWorks,
			failureDoneWorks,
		},
	}
);
