<?php declare(strict_types=1);

namespace App\Models\Auth;

use App\Models\Trn\TrnUserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;

class AuthUser extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'trn_user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'name',
        'image_url',
        'access_token',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * @return Attribute
     */
    protected function accessToken(): Attribute
    {
        return Attribute::make(
            get: fn (): string => decrypt($this->attributes['access_token']),
            set: fn (NewAccessToken $token) => (function ($token): string {
                $accessToken = explode('|', $token->plainTextToken, 2)[1];

                return encrypt($accessToken);
            })($token),
        );
    }

    /**
     * @return HasMany
     */
    public function trnUserRole(): HasMany
    {
        return $this->hasMany(TrnUserRole::class, 'user_id', 'id');
    }
}
