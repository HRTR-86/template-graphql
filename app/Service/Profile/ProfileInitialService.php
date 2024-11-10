<?php declare(strict_types=1);

namespace App\Service\Profile;

use App\Usecases\Profile\ProfileInitialOutput;
use Auth;

class ProfileInitialService
{
    /**
     * @return ProfileInitialOutput
     */
    public function handle(): ProfileInitialOutput
    {
        $loginUser = Auth::user();
        $trnUser   = $loginUser->with(['trnUserRole'])->first();

        return new ProfileInitialOutput($trnUser->trnUserRole);
    }
}
