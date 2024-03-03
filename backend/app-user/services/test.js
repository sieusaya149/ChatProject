headers ={
    authorize: "test"
}
const agencyId = headers['Agency-Id'] || headers['agency-id'];

console.log(agencyId)