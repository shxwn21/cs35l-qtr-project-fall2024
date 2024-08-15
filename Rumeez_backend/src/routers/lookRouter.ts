import express, { NextFunction, Request, Response, response } from 'express';
import userModel from '../models/user.model';
import passport from 'passport';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import ResponseError from '../ResponseError';
import { FullJWT, jwtFromHeader, jwtFromCookie, authStrategy } from '../authenticate';
import { MongoClient, ObjectId, Db, Collection } from 'mongodb';
import User from '../models/user.interface';
import { config } from "../config";


const lookRouter = express.Router();


//check if users like or users skipped
lookRouter.route('/')
    .get(authStrategy, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Inside GET");
        const validate: FullJWT = jwtFromCookie(req);
        try {
            const user = await userModel.findOne({ email: validate.token.payload.email });
        

            if (user) {
              const rankedResults = await rankDocuments(user);
              res.status(200).json(rankedResults);
              console.log('Successfully found and ranked documents');
              return;
            } else {
              // Handle the case when no user is found
              res.status(404).json({ message: 'User not found' });
              return;
            }
          } catch (err) {
            // Handle errors
            next(err);}
   });

lookRouter.route('/getuser/:userid')
   .get(authStrategy, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const validate: FullJWT = jwtFromCookie(req);
    if(req.params.userid =='undefined')
      {
        console.log('undefined in get user LOOK HERE');
        res.status(500).send('undefined');
        return;
      }
    try{
    const userid = req.params.userid;
    const user = await userModel.findById(userid).exec();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
    }
    catch (err) {
      next(err);
    }
   });


lookRouter.route('/like/:userid/:userToLikeId')
    .post(authStrategy, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    //in here read the body, which should be the user id that was like or disliked
    //remove from userToRec and 
    const userId = req.params.userid;
    const userToLikeId = req.params.userToLikeId;
    const user = await userModel.findById(userId).exec();
    console.log(user);
    const userToLike = await userModel.findById(userToLikeId).exec();
    console.log(userToLike);
    if(!user || ! userToLike)
      return;

    if(user.usersLiked)
    {
      if(isUserLiked(user, userToLikeId))
      {
        res.json(user.usersLiked)
        return;
      }
    }

    user.usersLiked?.push(userToLikeId);
    await user.save();
    res.json(user.usersLiked);

    });
 

    lookRouter.route('/skip/:userid/:userToSkipId')
    .post(authStrategy, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
      
      const userId = req.params.userid;
      const userToSkipId = req.params.userToSkipId;
      if(userToSkipId == 'undefined')
        {
          console.log('undefined id in skip');
          return;
        }

      const user = await userModel.findById(userId).exec();
      console.log(user);
      const userToSkip = await userModel.findById(userToSkipId).exec();
      console.log(userToSkip);
      if(!user || ! userToSkip)
        return;
  
      if(user.usersSkipped)
      {
        if(isUserSkipped(user, userToSkipId))
        {
          res.json(user.usersSkipped)
          return;
        }
      }
  
      user.usersSkipped?.push(userToSkipId);
      await user.save();
      res.json(user.usersSkipped);


    });


async function rankDocuments( parameterDocument: User): Promise<{ [key: string]: number; }> {
    const rankedResults: { [key: string]: number } = {};
    const documents = await userModel.find({});
    //if number of liked + skipped is all of the users, remove all skipped users and reshow those
    const numTotalUsers = await userModel.countDocuments();
    const numLiked = parameterDocument.usersLiked?.length ?? 0;
    const numSkipped = parameterDocument.usersSkipped?.length ?? 0;
    if (numLiked + numSkipped === numTotalUsers) {
      try {
        const userId = parameterDocument._id;
        await userModel.findByIdAndUpdate(userId, { $set: { usersSkipped: [] } });
    
        console.log('usersSkipped array cleared successfully.');
      } catch (error) {
        console.error('Error clearing usersSkipped array:', error);
      }
    }

  
    documents.forEach((document) => {
      if (!(documentsAreEqual(document, parameterDocument)) && (!documentAlreadySkippedOrLiked(document, parameterDocument))) {
        let score = calculateScore(document, parameterDocument);
        rankedResults[document._id.toHexString()] = score;
      }
    });
  
    // Sort the results by score in descending order
    const sortedResults = Object.entries(rankedResults)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
    return sortedResults;
  }



  //document = current user?
function calculateScore(document: User, parameterDocument: User): number{
    let score: number = 0;
    //console.log(document);
    //console.log(parameterDocument);
    
    console.log(document.preferences);
    console.log(parameterDocument.preferences);
    if(!document.preferences || !parameterDocument.preferences)
        return 0;

   if(document.preferences.dormType   == parameterDocument.preferences.dormType)
   {
      score += 10;
      console.log('dorm type' + document.preferences.dormType + ' ' + parameterDocument.preferences.dormType);
   }
    //numOfRooommates
    if(document.preferences.numberOfRoommates  == parameterDocument.preferences.numberOfRoommates)
       { 
        score += 10;
        console.log('numberOfRoomates type ' + document.preferences.numberOfRoommates + ' ' + parameterDocument.preferences.numberOfRoommates )
      }
    //gender
   if(document.preferences.genderOfRoomate == parameterDocument.gender &&  parameterDocument.preferences.genderOfRoomate == document.gender)
      { 
        console.log('gender')
       score += 12;
      }
    else if(document.preferences.genderOfRoomate == parameterDocument.gender ||parameterDocument.preferences.genderOfRoomate == document.gender )
        score += 5;

    //smoking or drinking
    if(document.preferences.drinking == parameterDocument.preferences.drinking)
       { 
        score += 7;
      console.log('drinking '  + score);
      }
    if(document.preferences.smoking == parameterDocument.preferences.smoking)
    { 
      score += 7;
    console.log('smoking '+ score);
    }
    //risetime
    if(document.preferences.riseTime == parameterDocument.preferences.riseTime)
    { 
      score += 9;
    console.log('risetime ' + score);
    }
    if(document.preferences.sleepTime == parameterDocument.preferences.sleepTime)
    { 
      score += 9;
    console.log('sleeptime' + score);
    }
    //temp
    
    if(document.preferences.temp == parameterDocument.preferences.temp)
    { 
      score += 10;
    console.log('temp' + score);
    }
    
    return score/74;
  }

  function documentsAreEqual(doc1: User, doc2: User): boolean {
    return doc1._id.equals(doc2._id);
  }

  function documentAlreadySkippedOrLiked(document: User, parameterDocument: User): boolean {
    // Check if document._id is in usersSkipped or usersLiked of parameterDocument
    if(parameterDocument.usersSkipped && parameterDocument.usersLiked)
    return (
      parameterDocument.usersSkipped.includes(document._id.toHexString()) ||
      parameterDocument.usersLiked.includes(document._id.toHexString())
    );
    if(parameterDocument.usersSkipped)
    return (parameterDocument.usersSkipped.includes(document._id.toHexString()) );
    if(parameterDocument.usersLiked)
    return parameterDocument.usersLiked.includes(document._id.toHexString());
    else
    return false;
  }

  function isUserLiked(user: User, userToLike: string): boolean {
    if(!user.usersLiked)
      return false;
    for (const likedUserId of user.usersLiked) {
      if (likedUserId === userToLike) {
        return true; // User is already liked
      }
    }
    return false; // User is not yet liked
  }

  function isUserSkipped(user: User, userToSkip: string): boolean {
    if(!user.usersSkipped)
      return false;
    for (const skippedUserId of user.usersSkipped) {
      if (skippedUserId === userToSkip) {
        return true; // User is already liked
      }
    }
    return false; // User is not yet liked
  }

export default lookRouter;
