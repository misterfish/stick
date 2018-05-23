// ------ function logic
// --- wrap short-circuiting && / ||

// --- like all1
export const both   = f => g => x => f (x) && g (x)
// --- like any1
export const either = f => g => x => f (x) || g (x)

export const allN   = (fs) => (x) => {
    for (const f of fs) if (!f (x)) return false
    return true
}



const andNot = not | andPredicate
// --- if (x | andNot (y))
// --- if (x | andNot (y))
// export const andPredicate = (p) => 

// export const allF = ()
export const allV = (fs) => (x) => {
}

export const bothPredicate = p => f => g => x =>
    p (f (x)) && p (g (x))
export const eitherPredicate = p => f => g => x =>
    p (f (x)) || p (g (x))

export const anyN   = (fs) => (x) => {
    for (const f of fs) if ( f (x)) return true
    return false
}

// ------ value logic
export const allPredicate = (p) => (xs) => {
    for (const x of xs) if (!p (x)) return false
    return true
}
export const anyPredicate = (p) => (xs) => {
    for (const x of xs) if ( p (x)) return true
    return false
}

export const any = p => xs => {
    for (const x of xs) if ( p (x)) return true
}

// --- wrap short-circuiting && / ||
export const and    = y => x => x &&  y
// export const andNot = y => x => x && !y
export const or     = y => x => x ||  y
export const orNot  = y => x => x || !y


