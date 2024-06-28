import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  memo,
  useMemo,
  useReducer,
} from 'react';

import useCallbackRef from '~/hooks/useCallbackRef';

type Voice = {
  Languagename: string;
  classification: string;
  classnamearray: string;
  name: string;
  plan: number;
  speaker: string;
};
type history = {
  title: string;
  description: string;
  time: string;
  id: string;
  urlVoice: string;
  image: string;
  selected: boolean;
};
type History = history[];
type ListVoice = Voice[];

type GoogleRemoteAds = {
  Banner: boolean;
  Inter_ads: boolean;
  Inter_Generate_Voice: boolean;
  Inter_History: boolean;
  Inter_Text_To_Speech: boolean;
  Native_Create_Voice: boolean;
  Native_Language: boolean;
  Resume: boolean;
  Rewards: boolean;
};
type ActionProps = {
  countApp: number;

  Voice: Voice;
  ListVoice: ListVoice;
  History: History;
  isPremium: boolean;
  adsMobState: GoogleRemoteAds;
};

type State = {
  result: ActionProps;
  isPremium: boolean;
  adsMobState: GoogleRemoteAds;
};

type Action = [
  | {
      type: 'COUNT_APP';
      payload: {
        countApp: number;
      };
    }
  | {
      type: 'VOICE';
      payload: {
        Voice: Voice;
      };
    }
  | {
      type: 'SET_LIST_VOICE';
      payload: {
        ListVoice: ListVoice;
      };
    }
  | {
      type: 'SET_STATE_HISTORY';
      payload: {
        History: History;
      };
    }
  | {
      type: 'IS_PREMIUM';
      payload: {
        isPremium: boolean;
      };
    }
  | {
      type: 'SET_STATE_ADS_MOB';
      payload: {
        adsMobState: GoogleRemoteAds;
      };
    },
];

type PreferenceActionsContextProps = {
  getActionStatePref: () => ActionProps;
  setActionCountApp?: (item: number) => void;

  setActionVoice?: (item: Voice) => void;
  setActionListVoice?: (item: ListVoice) => void;
  setActionHistory?: (item: History) => void;
  isPremium: (item: boolean) => void;
  setStateAdsMob?: (item: GoogleRemoteAds) => void;
  //Base preference action
};

type PreferenceContextProps = State;

const initialState: ActionProps = {
  countApp: 0,

  ListVoice: [],
  History: [],
  isPremium: false,
  adsMobState: {
    Banner: false,
    Inter_ads: false,
    Inter_Generate_Voice: false,
    Inter_History: false,
    Inter_Text_To_Speech: false,
    Native_Create_Voice: false,
    Native_Language: false,
    Resume: false,
    Rewards: false,
  },
  //Base initial state
};

const reducer = (state: State, action: Action): State => {
  const nextState = { ...state };
  switch (action.type) {
    case 'COUNT_APP':
      nextState.result.countApp = action.payload.countApp;
      break;
    case 'VOICE':
      nextState.result.Voice = action.payload.Voice;
      break;
    case 'SET_LIST_VOICE':
      nextState.result.ListVoice = action.payload.ListVoice;
      break;
    case 'SET_STATE_HISTORY':
      nextState.result.History = action.payload.History;
      break;
    case 'ISPREMIUM':
      nextState.result.isPremium = action.payload.isPremium;
      break;
    case 'SET_STATE_ADS_MOB':
      nextState.result.adsMobState = action.payload.adsMobState;
      break;
  }

  return nextState;
};

export const PreferenceActionsContext =
  createContext<PreferenceActionsContextProps>({
    getActionStatePref: () => initialState,
  });

export const PreferenceContext = createContext<PreferenceContextProps>({
  result: initialState,
});

const ActionPreferenceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, setState] = useReducer(reducer, { result: initialState });
  // const [isLocated, setIsLocated] = useState(false);

  const getActionStatePref = useCallbackRef(() => state.result);

  const setActionCountApp = useCallbackRef((dataPlayer: number) => {
    setState({
      type: 'COUNT_APP',
      payload: {
        countApp: dataPlayer,
      },
    });
  });
  const isPremium = useCallbackRef((item: boolean) =>
    setState({
      type: 'IS_PREMIUM',
      payload: {
        isPremium: item,
      },
    }),
  );

  const setActionVoice = useCallbackRef((Voice: Voice) => {
    setState({
      type: 'VOICE',
      payload: {
        Voice: Voice,
      },
    });
  });
  const setActionListVoice = useCallbackRef((ListVoice: ListVoice) => {
    setState({
      type: 'SET_LIST_VOICE',
      payload: {
        ListVoice: ListVoice,
      },
    });
  });
  const setActionHistory = useCallbackRef((History: History) => {
    setState({
      type: 'SET_STATE_HISTORY',
      payload: {
        History: History,
      },
    });
  });

  const setStateAdsMob = useCallbackRef((item: object) => {
    setState({
      type: 'SET_STATE_ADS_MOB',
      payload: {
        adsMobState: item,
      },
    });
  });
  const actionValues = useMemo(
    () => ({
      getActionStatePref,
      setActionCountApp,

      setActionVoice,
      setActionListVoice,
      setActionHistory,
      isPremium,
      setStateAdsMob,
    }),
    [],
  );

  return (
    <PreferenceActionsContext.Provider value={actionValues}>
      <PreferenceContext.Provider value={state}>
        {children}
      </PreferenceContext.Provider>
    </PreferenceActionsContext.Provider>
  );
};

export default memo(ActionPreferenceProvider);
