import firebase from "firebase/app";

export default {
    actions: {
        async creatRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid');
                const path = `/users/${uid}/records`;
                return await firebase.database().ref(path).push(record);
            } catch (e) {
              commit('setError', e);
              throw e;
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                const receivedRecords = await firebase
                    .database()
                    .ref(`/users/${uid}/records`)
                    .once('value');
                const records = receivedRecords.val() || {};

                return Object.keys(records).map(key => ({...records[key], id: key}));
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUid');
                const receivedRecord = await firebase
                    .database()
                    .ref(`/users/${uid}/records`)
                    .child(id)
                    .once('value');
                const record = receivedRecord.val() || {};

                return {...record, id};
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}