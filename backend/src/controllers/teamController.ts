import { resultOk, resultError } from '../middleware/resultHandler';
import { validation } from '../middleware/validation';
import { Router } from 'express';
import { NewRoleSchema, TeamCreateNewSchema, TeamEditSchema, TeamJoinSchema } from '../models';
import { teamsRepository, usersRepository } from '../repository';

const teamRouter = Router();

teamRouter.get('/:teamId', async (req, res) => {

  if (!req.session.user) {
    return resultError(500, res, "Authorization problem");
  }
  const teamId = req.params.teamId;
  const team = await teamsRepository.getSingleById(teamId);
  if (team.isErr) {
    return resultError(500, res, team.error.message);
  }
  if (team.value === null) {
    return resultError(404, res, `Team with ID ${teamId} doesn't exist`);
  }
  const role = await teamsRepository.getUserRoleLevel(teamId, req.session.user.id);

  if (role.isErr) {
    return resultError(500, res, role.error.message);
  }

  return resultOk({ ...team.value, ...role.value }, res, `Listed team with id ${teamId}`);
});

teamRouter.get('/:teamId/members', async (req, res) => {
  const teamId = req.params.teamId;
  const team = await teamsRepository.getSingleById(teamId);
  if (team.isErr) {
    return resultError(500, res, team.error.message);
  }
  if (team.value === null) {
    return resultError(404, res, `Team with ID ${teamId} doesn't exist`);
  }
  return resultOk(team.value, res, `Listed team with id ${teamId}`);
});

teamRouter.post('/new',
  validation({ body: TeamCreateNewSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }
    const user = await usersRepository.getSingleByEmail(
      req.session.user.email!
    );
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }

    const team = await teamsRepository.createSingle({
      name: req.body.name,
      userId: user.value!.id,
    });
    if (team.isErr) {
      return resultError(500, res, team.error.message);
    }
    return resultOk(team.value, res, `Created team with id: ${team.value?.id}`);
  }
);

teamRouter.post('/join',
  validation({ body: TeamJoinSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }
    const user = await usersRepository.getSingleByEmail(
      req.session.user.email!
    );
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }

    const team = await teamsRepository.joinTeam({
      inviteCode: req.body.inviteCode,
      userId: user.value!.id,
    });
    if (team.isErr) {
      return resultError(500, res, team.error.message);
    }
    return resultOk(team.value, res, `Joined team with id: ${team.value?.id}`);
  }
);

teamRouter.post('/:teamId/edit',
  validation({ body: TeamEditSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const team = await teamsRepository.editSingle({
      id: req.body.id,
      name: req.body.name,
    });
    if (team.isErr) {
      return resultError(500, res, team.error.message);
    }
    return resultOk(team.value, res, `Edited team with id: ${team.value?.id}`);
  }
);

teamRouter.post('/changeRole',
  validation({ body: NewRoleSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const work = await teamsRepository.editRole(req.body);
    if (work.isErr) {
      return resultError(500, res, work.error.message);
    }
    return resultOk(work.value, res, `Role edited for work with id: ${work.value?.id}`);
  }
);

export default teamRouter;