import { environment } from "../../environments/environment";

export function authFactory(afAuth: AngularFireAuth) {
  switch (environment.authMode) {
    case AuthMode.InMemory:

    case AuthMode.FirebaseAuthService(afAuth)

    case AuthMode.CustomServer:
      throw new Error('Not yet implemented')
  }
}
